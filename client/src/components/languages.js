const languages = [
  {
    name: "cpp",
    extension: ".cpp",
    defaultCode:
      '#include <iostream>\r\nusing namespace std;\r\n \r\nint main() {\r\n    cout << "Hello World!";\r\n    return 0;\r\n}',
    previousCode: "",
  },
  {
    name: "python",
    extension: ".py",
    defaultCode: 'print("Hello World!")',
    previousCode: "",
  },
  {
    name: "javascript",
    extension: ".js",
    defaultCode: 'console.log("Hello World!");',
    previousCode: "",
  },
  {
    name: "java",
    extension: ".java",
    defaultCode:
      'class Main {\r\n    public static void main(String[] args) {\r\n        System.out.println("Hello World!");\r\n    }\r\n}',
    previousCode: "",
  },
  {
    name: "go",
    extension: ".go",
    defaultCode:
      'package main\r\n\r\nimport (\r\n    "fmt"\r\n)\r\n\r\nfunc main() {\r\n    fmt.Println("Hello World!")\r\n}',
    previousCode: "",
  },
  {
    name: "csharp",
    extension: ".cs",
    defaultCode:
      'using System;\r\n\r\nclass MainClass {\r\n    static void Main() {\r\n        Console.WriteLine("Hello World!");\r\n    }\r\n}',
    previousCode: "",
  },
];

export default languages;
