import sys
import types
import warnings

# Stub optional modules that may not exist in the test environment.
sys.modules.setdefault(
    "src.database.neo4j_conn",
    types.SimpleNamespace(neo4j_conn=None)
)

warnings.filterwarnings(
    "ignore",
    message=".*ffmpeg or avconv.*",
    category=RuntimeWarning
)
warnings.filterwarnings(
    "ignore",
    category=RuntimeWarning,
    module="pydub.*"
)
warnings.simplefilter("ignore", RuntimeWarning)
