### Notes from DevConnector class

- [Udemy course](https://www.udemy.com/course/mern-stack-front-to-back/)
- Node regular dependencies : `npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request`
- Node dev dependencies : `npm i -D nodemon concurrently`

###### Setting up Prettier

- installed with `npm install --save-dev --save-exact prettier`
- created empty config `echo {}> .prettierrc.json`
- create ignore `echo {}> .prettierignore`
- in VSCode settings add
  ```
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": null
  }
  ```

###### Corrected errors in VScode settings and integrated terminal

- current settings :

```
{
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  "window.zoomLevel": 0,
  "browser-preview.startUrl": "http://localhost:3000",
  "terminal.explorerKind": "external",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode" // Use only for JS
  },
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "workbench.editor.decorations.badges": true,
  "workbench.editor.decorations.colors": true,
  "code-runner.runInTerminal": true,
  "prettier.jsxSingleQuote": true,
  "prettier.singleQuote": true,
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "path": [
        "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
      ],
      "icon": "terminal-powershell"
    },
    "Command Prompt": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [],
      "icon": "terminal-cmd"
    },
    "Git Bash": {
      "source": "GitBash",
      "path": ["C:\\Program Files\\Git\\bin\\bash.exe"],
      "icon": "terminal-bash"
    },
    "Ubu": {
      "source": "Ubuntu",
      "path": [
        "C:\\Users\\Zac\\AppData\\Local\\Microsoft\\WindowsApps\\ubuntu.exe"
      ],
      "icon": "terminal-ubuntu"
    }
  },
  "terminal.integrated.defaultProfile.windows": "Ubuntu (WSL)",
  "workbench.colorTheme": "monokai-charcoal (green)",
  "workbench.colorCustomizations": {
    "terminal.background": "#0b0c0c",
    "terminal.foreground": "#A89984",
    "terminalCursor.background": "#A89984",
    "terminalCursor.foreground": "#A89984",
    "terminal.ansiBlack": "#1D2021",
    "terminal.ansiBlue": "#0D6678",
    "terminal.ansiBrightBlack": "#665C54",
    "terminal.ansiBrightBlue": "#0D6678",
    "terminal.ansiBrightCyan": "#8BA59B",
    "terminal.ansiBrightGreen": "#95C085",
    "terminal.ansiBrightMagenta": "#8F4673",
    "terminal.ansiBrightRed": "#FB543F",
    "terminal.ansiBrightWhite": "#FDF4C1",
    "terminal.ansiBrightYellow": "#FAC03B",
    "terminal.ansiCyan": "#8BA59B",
    "terminal.ansiGreen": "#aafc8f",
    "terminal.ansiMagenta": "#8F4673",
    "terminal.ansiRed": "#FB543F",
    "terminal.ansiWhite": "#A89984",
    "terminal.ansiYellow": "#FAC03B"
  }
}
```
