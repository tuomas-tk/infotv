module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "plugins": [
        "html"
    ],
    "settings": {
      "html/indent": "0",
      "html/report-bad-indent": 1,
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
