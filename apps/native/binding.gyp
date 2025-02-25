{
  "targets": [
    {
      "target_name": "module",
      "source": ["./src/hello.cpp"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<!@(node -p \"require('node-addon-api').headers\")"
      ],
      "cflags": ["-std=c++17"],
      "cflags_cc": ["-std=c++17"],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
      "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"]
    }
  ]
}
