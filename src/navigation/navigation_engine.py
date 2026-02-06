"""
Navigation Engine for LearnFast Core.

Handles concept traversal, root concept identification, and prerequisite validation.
"""

import logging
from typing import List, Dict, Any, Optional

from src.database.connections import neo4j_conn

logger = logging.getLogger(__name__)


class NavigationEngine:
    """
    Handles navigation through the concept graph.
    
    Provides methods to find root concepts, preview learning paths,
    and validate prerequisites for concept unlocking.
    """
    
    def __init__(self):
        """Initialize the navigation engine."""
        self.connection = neo4j_conn
        
    def find_root_concepts(self) -> List[str]:
        """
        Identify root concepts (concepts with no prerequisites).
        
        Returns:
            List of root concept names.
        """
        try:
            # Query for concepts that have no incoming PREREQUISITE relationships
            query = """
                MATCH (c:Concept)
                WHERE NOT ()-[:PREREQUISITE]->(c)
                RETURN c.name as name
                ORDER BY c.name
            """
            
            result = self.connection.execute_query(query)
            return [record["name"] for record in result]
            
        except Exception as e:
            logger.error(f"Error finding root concepts: {str(e)}")
            return []
            
    def get_path_preview(self, root_concept: str, depth: int = 3) -> List[str]:
        """
        Get a preview of the learning path starting from a root concept.
        
        Args:
            root_concept: Name of the starting concept
            depth: Maximum depth to traverse (default 3)
            
        Returns:
            List of concept names in the preview path (breadth-first order)
        """
        if not root_concept:
            return []
            
        try:
            normalized_root = root_concept.strip().lower()
            
            # Use variable-length path matching up to specified depth
            query = """
                MATCH path = (root:Concept {name: $root_name})-[:PREREQUISITE*0..%d]->(c:Concept)
                RETURN c.name as name
                ORDER BY length(path), c.name
            """ % depth
            
            result = self.connection.execute_query(query, {"root_name": normalized_root})
            
            # Return unique concept names in order of appearance
            seen = set()
            path = []
            for record in result:
                name = record["name"]
                if name not in seen:
                    path.append(name)
                    seen.add(name)
                    
            return path
            
        except Exception as e:
            logger.error(f"Error getting path preview for '{root_concept}': {str(e)}")
            return []
            
    def validate_prerequisites(self, user_id: str, concept: str) -> bool:
        """
        Validate if a user has completed all prerequisites for a specific concept.
        
        Args:
            user_id: Unique user identifier
            concept: Target concept name
            
        Returns:
            True if all prerequisites are completed or if there are no prerequisites.
        """
        if not user_id or not concept:
            return False
            
        try:
            normalized_concept = concept.strip().lower()
            
            # Check if there are any prerequisites that the user hasn't completed
            # We look for immediate prerequisites of the target concept
            # And check if there is NOT a COMPLETED relationship from the user to that prerequisite
            query = """
                MATCH (target:Concept {name: $concept_name})
                OPTIONAL MATCH (prereq:Concept)-[:PREREQUISITE]->(target)
                WHERE NOT EXISTS {
                    MATCH (:User {uid: $user_id})-[:COMPLETED]->(prereq)
                }
                RETURN count(prereq) as missing_prerequisites
            """
            
            result = self.connection.execute_query(query, {
                "user_id": user_id, 
                "concept_name": normalized_concept
            })
            
            if not result:
                return False
                
            missing_count = result[0]["missing_prerequisites"]
            return missing_count == 0
            
        except Exception as e:
            logger.error(f"Error validating prerequisites for user '{user_id}' and concept '{concept}': {str(e)}")
            return False

    def get_unlocked_concepts(self, user_id: str) -> List[str]:
        """
        Get all concepts that are currently unlocked for the user.
        
        A concept is unlocked if:
        1. It has no prerequisites (root concept)
        2. OR all its immediate prerequisites have been completed by the user
        3. AND the concept itself is not already completed
        
        Args:
            user_id: Unique user identifier
            
        Returns:
            List of unlocked concept names
        """
        if not user_id:
            return []
            
        try:
            # Find concepts where:
            # 1. User hasn't completed/started it yet (optional - maybe we want to show started ones too? 
            #    Spec says "available learning paths", usually implies new things to learn or continue.
            #    Let's interpret unlocked as "ready to start".
            
            query = """
                MATCH (c:Concept)
                WHERE NOT EXISTS {
                    MATCH (:User {uid: $user_id})-[:COMPLETED]->(c)
                }
                AND ALL(prereq IN [(p:Concept)-[:PREREQUISITE]->(c) | p] 
                        WHERE EXISTS {
                            MATCH (:User {uid: $user_id})-[:COMPLETED]->(prereq)
                        })
                RETURN c.name as name
                ORDER BY c.name
            """
            
            result = self.connection.execute_query(query, {"user_id": user_id})
            return [record["name"] for record in result]
            
        except Exception as e:
            logger.error(f"Error getting unlocked concepts for user '{user_id}': {str(e)}")
            return []

    def get_neighborhood(self, concept_name: str) -> Dict[str, Any]:
        """
        Get immediate prerequisites and dependents of a concept.
        
        Args:
            concept_name: Name of the concept
            
        Returns:
            Dict containing nodes and edges for the local neighborhood graph.
        """
        if not concept_name:
            return {"nodes": [], "edges": []}
            
        try:
            normalized_name = concept_name.strip().lower()
            
            # Query for immediate neighbors (in and out)
            query = """
                MATCH (target:Concept {name: $name})
                OPTIONAL MATCH (pre:Concept)-[r1:PREREQUISITE]->(target)
                OPTIONAL MATCH (target)-[r2:PREREQUISITE]->(post:Concept)
                RETURN 
                    target.name as target_name,
                    collect(DISTINCT {name: pre.name, type: 'prerequisite'}) as prerequisites,
                    collect(DISTINCT {name: post.name, type: 'dependent'}) as dependents
            """
            
            result = self.connection.execute_query(query, {"name": normalized_name})
            
            if not result:
                return {"nodes": [], "edges": []}
                
            data = result[0]
            nodes = [{"id": data["target_name"], "group": "target"}]
            edges = []
            
            seen_nodes = {data["target_name"]}
            
            for p in data["prerequisites"]:
                if p["name"]:
                    if p["name"] not in seen_nodes:
                        nodes.append({"id": p["name"], "group": "prerequisite"})
                        seen_nodes.add(p["name"])
                    edges.append({"source": p["name"], "target": data["target_name"], "type": "prerequisite"})
                    
            for d in data["dependents"]:
                if d["name"]:
                    if d["name"] not in seen_nodes:
                        nodes.append({"id": d["name"], "group": "dependent"})
                        seen_nodes.add(d["name"])
                    edges.append({"source": data["target_name"], "target": d["name"], "type": "dependent"})
                    
            return {"nodes": nodes, "edges": edges}
            
        except Exception as e:
            logger.error(f"Error getting neighborhood for '{concept_name}': {str(e)}")
            return {"nodes": [], "edges": []}

    def get_full_graph(self, user_id: str = None) -> Dict[str, Any]:
        """
        Get the entire concept graph enriched with user progress status.
        
        Args:
            user_id: The ID of the user to fetch progress for.
            
        Returns:
            Dict containing nodes and links for the complete graph.
            Nodes will have a 'status' field: LOCKED, UNLOCKED, COMPLETED, IN_PROGRESS.
        """
        try:
            # Fetch all concepts with optional user status
            nodes_query = """
                MATCH (c:Concept)
                OPTIONAL MATCH (:User {uid: $user_id})-[r_status:COMPLETED|IN_PROGRESS]->(c)
                RETURN c.name as name, c.description as description, type(r_status) as status
            """
            
            # Fetch all relationships
            links_query = """
                MATCH (s:Concept)-[r:PREREQUISITE]->(t:Concept)
                RETURN s.name as source, t.name as target, type(r) as type
            """
            
            nodes_result = self.connection.execute_query(nodes_query, {"user_id": user_id or "default_user"})
            links_result = self.connection.execute_query(links_query)
            
            # 1. Normalization & Node Map Construction
            # We map lower_case_name -> {canonical_name, data}
            node_map = {}
            
            for record in nodes_result:
                name = record["name"]
                if not name: continue
                
                normalized = name.strip().lower()
                status = record["status"] # COMPLETED, IN_PROGRESS, or None
                
                # If we encounter the same concept name (case-variant), prefer the one with status or longer description
                # For now, simplistic first-wins or status-wins logic
                if normalized not in node_map:
                    node_map[normalized] = {
                        "id": name, # Keep original casing of the first one found
                        "name": name,
                        "description": record["description"] or "",
                        "status": status,
                        "val": 10 # Default size
                    }
                else:
                    # Update status if this variant has one and existing doesn't
                    if status and not node_map[normalized]["status"]:
                        node_map[normalized]["status"] = status
                        
            # 2. Build Adjacency List (for dependency checking)
            # normalized_target -> set(normalized_sources)
            dependencies = {n: set() for n in node_map}
            
            links = []
            for record in links_result:
                source = record["source"]
                target = record["target"]
                
                if not source or not target: continue
                
                norm_source = source.strip().lower()
                norm_target = target.strip().lower()
                
                # Only include link if both nodes exist in our cleaned map
                if norm_source in node_map and norm_target in node_map:
                    dependencies[norm_target].add(norm_source)
                    
                    # Use the canonical IDs from our node_map
                    links.append({
                        "source": node_map[norm_source]["id"],
                        "target": node_map[norm_target]["id"],
                        "relationship": record["type"]
                    })
                    
            # 3. Calculate Status (LOCKED vs UNLOCKED)
            # Logic:
            # - If already COMPLETED or IN_PROGRESS -> Keep as is
            # - If NO prerequisites -> UNLOCKED (Root)
            # - If ALL prerequisites are COMPLETED -> UNLOCKED
            # - Else -> LOCKED
            
            final_nodes = []
            for norm_name, data in node_map.items():
                current_status = data["status"]
                
                if current_status == "COMPLETED":
                    final_status = "COMPLETED"
                elif current_status == "IN_PROGRESS":
                    final_status = "IN_PROGRESS"
                else:
                    # Check prerequisites
                    prereqs = dependencies[norm_name]
                    if not prereqs:
                        final_status = "UNLOCKED" # Root concept
                    else:
                        all_met = True
                        for p in prereqs:
                            if node_map[p]["status"] != "COMPLETED":
                                all_met = False
                                break
                        final_status = "UNLOCKED" if all_met else "LOCKED"
                        
                data["status"] = final_status
                
                # Dynamic sizing based on connectivity (degree)
                degree = len([l for l in links if l["source"] == data["id"] or l["target"] == data["id"]])
                data["val"] = 10 + (degree * 2)
                
                final_nodes.append(data)
                
            return {"nodes": final_nodes, "links": links}
            
        except Exception as e:
            logger.error(f"Error getting full graph: {str(e)}")
            return {"nodes": [], "links": []}


# ========== Multi-Document Navigation ==========


class MultiDocNavigationEngine:
    """
    Handles navigation through document-specific knowledge graphs.
    
    Provides methods to query concepts within a document's scope
    and discover cross-document connections.
    """
    
    def __init__(self):
        self.connection = neo4j_conn
        from src.database.graph_storage import multi_doc_graph_storage
        self.graph_storage = multi_doc_graph_storage
    
    def get_document_root_concepts(self, document_id: int) -> List[Dict[str, Any]]:
        """
        Find root concepts within a specific document.
        
        Root concepts have no incoming PREREQUISITE relationships within the document.
        
        Args:
            document_id: The document to query
            
        Returns:
            List of concept dictionaries with scoped_id, name, and metadata
        """
        try:
            query = """
                MATCH (dc:DocumentConcept)
                MATCH (d:Document {id: $doc_id})-[:CONTAINS]->(dc)
                WHERE NOT ()-[:PREREQUISITE {document_id: $doc_id}]->(dc)
                RETURN dc.id as scoped_id, dc.global_name as name,
                       dc.normalized_name as normalized, dc.description,
                       dc.depth_level, dc.chunk_ids
                ORDER BY dc.global_name
            """
            
            result = self.connection.execute_query(query, {"doc_id": document_id})
            
            return [
                {
                    "scoped_id": r["scoped_id"],
                    "name": r["name"],
                    "normalized": r["normalized"],
                    "description": r["description"],
                    "depth_level": r["depth_level"],
                    "chunk_ids": r["chunk_ids"]
                }
                for r in result
            ]
            
        except Exception as e:
            logger.error(f"Error getting document roots for doc {document_id}: {e}")
            return []
    
    def get_document_path_preview(self, document_id: int, root_concept: str, depth: int = 3) -> List[str]:
        """
        Get a preview of the learning path within a document.
        
        Args:
            document_id: The document to query
            root_concept: Starting concept name (not scoped)
            depth: Maximum depth to traverse
            
        Returns:
            List of scoped concept names in order
        """
        try:
            normalized_root = root_concept.strip().lower()
            scoped_root = self.graph_storage.generate_scoped_id(document_id, root_concept)
            
            query = """
                MATCH path = (root:DocumentConcept {id: $scoped_root})-[:PREREQUISITE {document_id: $doc_id}*0..$depth]->(c:DocumentConcept)
                WHERE (d:Document {id: $doc_id})-[:CONTAINS]->(root)
                AND (d:Document {id: $doc_id})-[:CONTAINS]->(c)
                RETURN c.id as scoped_id, c.global_name as name
                ORDER BY length(path), c.global_name
            """
            
            result = self.connection.execute_query(query, {
                "scoped_root": scoped_root,
                "doc_id": document_id,
                "depth": depth
            })
            
            seen = set()
            path = []
            for r in result:
                if r["scoped_id"] not in seen:
                    path.append(r["scoped_id"])
                    seen.add(r["scoped_id"])
            
            return path
            
        except Exception as e:
            logger.error(f"Error getting document path preview: {e}")
            return []
    
    def get_document_neighborhood(self, document_id: int, concept_name: str) -> Dict[str, Any]:
        """
        Get local neighborhood for a concept within a document.
        
        Args:
            document_id: The document to query
            concept_name: Concept name (not scoped)
            
        Returns:
            Dict with nodes and edges for visualization
        """
        try:
            scoped_id = self.graph_storage.generate_scoped_id(document_id, concept_name)
            
            query = """
                MATCH (target:DocumentConcept {id: $scoped_id})
                OPTIONAL MATCH (pre:DocumentConcept)-[r1:PREREQUISITE {document_id: $doc_id}]->(target)
                OPTIONAL MATCH (target)-[r2:PREREQUISITE {document_id: $doc_id}]->(post:DocumentConcept)
                RETURN 
                    target.id as target_id, target.global_name as target_name,
                    collect(DISTINCT {id: pre.id, name: pre.global_name, type: 'prerequisite'}) as prerequisites,
                    collect(DISTINCT {id: post.id, name: post.global_name, type: 'dependent'}) as dependents
            """
            
            result = self.connection.execute_query(query, {
                "scoped_id": scoped_id,
                "doc_id": document_id
            })
            
            if not result:
                return {"nodes": [], "edges": []}
            
            data = result[0]
            nodes = [{"id": data["target_id"], "name": data["target_name"], "group": "target"}]
            edges = []
            seen = {data["target_id"]}
            
            for p in data["prerequisites"]:
                if p["id"] and p["id"] not in seen:
                    nodes.append({"id": p["id"], "name": p["name"], "group": "prerequisite"})
                    seen.add(p["id"])
                    edges.append({"source": p["id"], "target": data["target_id"], "type": "prerequisite"})
            
            for d in data["dependents"]:
                if d["id"] and d["id"] not in seen:
                    nodes.append({"id": d["id"], "name": d["name"], "group": "dependent"})
                    seen.add(d["id"])
                    edges.append({"source": data["target_id"], "target": d["id"], "type": "dependent"})
            
            return {"nodes": nodes, "edges": edges}
            
        except Exception as e:
            logger.error(f"Error getting document neighborhood: {e}")
            return {"nodes": [], "edges": []}
    
    def get_cross_document_connections(self, document_id: int) -> List[Dict[str, Any]]:
        """
        Find concepts in this document that connect to other documents.
        
        Args:
            document_id: The document to check
            
        Returns:
            List of cross-document connection info
        """
        try:
            query = """
                MATCH (dc:DocumentConcept)
                MATCH (d:Document {id: $doc_id})-[:CONTAINS]->(dc)
                OPTIONAL MATCH (dc)-[:MERGED_INTO]->(gc:GlobalConcept)
                OPTIONAL MATCH (other:DocumentConcept)-[:MERGED_INTO]->(gc)
                WHERE other.document_id <> $doc_id
                RETURN 
                    dc.id as scoped_id, dc.global_name as name,
                    gc.id as global_id, gc.global_name as global_name,
                    collect(DISTINCT other.document_id) as other_doc_ids
            """
            
            result = self.connection.execute_query(query, {"doc_id": document_id})
            
            connections = []
            for r in result:
                if r["other_doc_ids"]:
                    connections.append({
                        "scoped_id": r["scoped_id"],
                        "local_name": r["name"],
                        "global_id": r["global_id"],
                        "global_name": r["global_name"],
                        "other_documents": r["other_doc_ids"],
                        "connection_count": len(r["other_doc_ids"])
                    })
            
            return sorted(connections, key=lambda x: x["connection_count"], reverse=True)
            
        except Exception as e:
            logger.error(f"Error getting cross-document connections: {e}")
            return []
    
    def find_concept_across_documents(self, concept_name: str) -> List[Dict[str, Any]]:
        """
        Find all occurrences of a concept across all documents.
        
        Args:
            concept_name: Concept to search for
            
        Returns:
            List of {document_id, scoped_id, name, chunk_ids}
        """
        normalized = concept_name.strip().lower()
        
        try:
            query = """
                MATCH (dc:DocumentConcept {normalized_name: $normalized})
                MATCH (d:Document)-[:CONTAINS]->(dc)
                RETURN d.id as document_id, dc.id as scoped_id,
                       dc.global_name as name, dc.description,
                       dc.chunk_ids, dc.is_merged
                ORDER BY d.id
            """
            
            result = self.connection.execute_query(query, {"normalized_name": normalized})
            
            return [
                {
                    "document_id": r["document_id"],
                    "scoped_id": r["scoped_id"],
                    "name": r["name"],
                    "description": r["description"],
                    "chunk_ids": r["chunk_ids"],
                    "is_merged": r["is_merged"]
                }
                for r in result
            ]
            
        except Exception as e:
            logger.error(f"Error finding concept across documents: {e}")
            return []


# Global instance
multi_doc_navigation = MultiDocNavigationEngine()
