const languages = [
  {
    name: "cpp",
    extension: ".cpp",
    defaultCode:
      '#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    cout << "Hello World!";\r\n    return 0;\r\n}',
    previousCode: "",
  },
  {
    name: "python",
    extension: ".py",
    defaultCode: 'print("Hello World")',
    previousCode: "",
  },
];

export default languages;
