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
