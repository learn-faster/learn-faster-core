import asyncio
import sys
import os

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.services.resource_scout import resource_scout
from src.navigation.navigation_engine import NavigationEngine
from src.database.init_db import initialize_databases

async def verify_resource_scout():
    print("\n--- Verifying Resource Scout ---")
    concept = "Machine Learning"
    print(f"Scouting resources for: {concept}...")
    try:
        results = await resource_scout.get_resources_for_concept(concept)
        print("Results received:")
        print(f"Books found: {len(results.get('books', []))}")
        print(f"Courses found: {len(results.get('courses', []))}")
        
        if results.get('books'):
            print(f"Sample Book: {results['books'][0]['title']}")
            
        return len(results.get('books', [])) > 0
    except Exception as e:
        print(f"Resource Scout failed: {e}")
        return False

async def verify_graph_structure():
    print("\n--- Verifying Graph Structure ---")
    nav = NavigationEngine()
    try:
        # Test with default user
        graph = nav.get_full_graph(user_id="test_user")
        nodes = graph.get("nodes", [])
        links = graph.get("links", [])
        
        print(f"Nodes: {len(nodes)}")
        print(f"Links: {len(links)}")
        
        if len(nodes) > 0:
            sample = nodes[0]
            print(f"Sample Node: {sample['name']}")
            print(f"Status: {sample.get('status')}")
            print(f"Val: {sample.get('val')}")
            
            # Check for normalized keys
            if 'id' in sample and 'val' in sample and 'status' in sample:
                print("Node structure is correct.")
                return True
            else:
                print(f"Invalid node structure: {sample.keys()}")
                return False
        else:
            print("Graph is empty, cannot fully verify structure but no error occurred.")
            return True
            
    except Exception as e:
        print(f"Graph verification failed: {e}")
        return False

async def main():
    print("Initializing databases...")
    initialize_databases()
    
    scout_ok = await verify_resource_scout()
    graph_ok = await verify_graph_structure()
    
    if scout_ok and graph_ok:
        print("\n✅ All verifications passed!")
    else:
        print("\n❌ Verification failed.")

if __name__ == "__main__":
    asyncio.run(main())
