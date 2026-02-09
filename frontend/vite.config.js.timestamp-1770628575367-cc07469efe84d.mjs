// vite.config.js
import path from "path";
import { defineConfig, loadEnv } from "file:///D:/Opensource_repos/learn-faster-core/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Opensource_repos/learn-faster-core/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
var __vite_injected_original_dirname = "D:\\Opensource_repos\\learn-faster-core\\frontend";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_BACKEND_URL || env.BACKEND_URL || "http://localhost:8001";
  const apiPort = env.VITE_API_PORT || env.API_PORT || "8001";
  const localBackend = `http://localhost:${apiPort}`;
  const targetUrl = backendUrl || localBackend;
  console.log(`[Vite Config] Backend target: ${targetUrl}`);
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src"),
        "next/navigation": path.resolve(__vite_injected_original_dirname, "./src/test/next-navigation-mock.js")
      }
    },
    server: {
      proxy: {
        "/api": {
          target: targetUrl,
          changeOrigin: true,
          secure: false
        },
        "/uploads": {
          target: targetUrl,
          changeOrigin: true,
          secure: false
        }
      }
    },
    define: {
      // Make build-time env available to the app
      __BACKEND_URL__: JSON.stringify(targetUrl)
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",
      globals: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxPcGVuc291cmNlX3JlcG9zXFxcXGxlYXJuLWZhc3Rlci1jb3JlXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxPcGVuc291cmNlX3JlcG9zXFxcXGxlYXJuLWZhc3Rlci1jb3JlXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9PcGVuc291cmNlX3JlcG9zL2xlYXJuLWZhc3Rlci1jb3JlL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICAvLyBMb2FkIGVudiBmaWxlIGJhc2VkIG9uIG1vZGVcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKVxyXG5cclxuICAvLyBHZXQgYmFja2VuZCBVUkwgZnJvbSBlbnZpcm9ubWVudCBvciB1c2UgZGVmYXVsdHNcclxuICBjb25zdCBiYWNrZW5kVXJsID0gZW52LlZJVEVfQkFDS0VORF9VUkwgfHwgZW52LkJBQ0tFTkRfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjgwMDEnXHJcbiAgY29uc3QgYXBpUG9ydCA9IGVudi5WSVRFX0FQSV9QT1JUIHx8IGVudi5BUElfUE9SVCB8fCAnODAwMSdcclxuICBjb25zdCBsb2NhbEJhY2tlbmQgPSBgaHR0cDovL2xvY2FsaG9zdDoke2FwaVBvcnR9YFxyXG5cclxuICAvLyBVc2UgZXhwbGljaXQgYmFja2VuZCBVUkwgaWYgc2V0LCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gbG9jYWxob3N0XHJcbiAgY29uc3QgdGFyZ2V0VXJsID0gYmFja2VuZFVybCB8fCBsb2NhbEJhY2tlbmRcclxuXHJcbiAgY29uc29sZS5sb2coYFtWaXRlIENvbmZpZ10gQmFja2VuZCB0YXJnZXQ6ICR7dGFyZ2V0VXJsfWApXHJcblxyXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgICBcIm5leHQvbmF2aWdhdGlvblwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3Rlc3QvbmV4dC1uYXZpZ2F0aW9uLW1vY2suanNcIiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IHRhcmdldFVybCxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnL3VwbG9hZHMnOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IHRhcmdldFVybCxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XG4gICAgICAvLyBNYWtlIGJ1aWxkLXRpbWUgZW52IGF2YWlsYWJsZSB0byB0aGUgYXBwXG4gICAgICBfX0JBQ0tFTkRfVVJMX186IEpTT04uc3RyaW5naWZ5KHRhcmdldFVybCksXG4gICAgfSxcbiAgICB0ZXN0OiB7XG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICAgIHNldHVwRmlsZXM6ICcuL3NyYy90ZXN0L3NldHVwLmpzJyxcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVSxPQUFPLFVBQVU7QUFDclYsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBRmxCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUczQyxRQUFNLGFBQWEsSUFBSSxvQkFBb0IsSUFBSSxlQUFlO0FBQzlELFFBQU0sVUFBVSxJQUFJLGlCQUFpQixJQUFJLFlBQVk7QUFDckQsUUFBTSxlQUFlLG9CQUFvQixPQUFPO0FBR2hELFFBQU0sWUFBWSxjQUFjO0FBRWhDLFVBQVEsSUFBSSxpQ0FBaUMsU0FBUyxFQUFFO0FBRXhELFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDcEMsbUJBQW1CLEtBQUssUUFBUSxrQ0FBVyxvQ0FBb0M7QUFBQSxNQUNqRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxRQUNWO0FBQUEsUUFDQSxZQUFZO0FBQUEsVUFDVixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxNQUVOLGlCQUFpQixLQUFLLFVBQVUsU0FBUztBQUFBLElBQzNDO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWixTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
