from src.database.connections import neo4j_conn

def check_indexes():
    try:
        results = neo4j_conn.execute_query("SHOW CONSTRAINTS")
        print("Existing Constraints:")
        for r in results:
            print(f"- {r['name']}: {r['type']} on {r['labelsOrTypes']} {r['properties']}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_indexes()
