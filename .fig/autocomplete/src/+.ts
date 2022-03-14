const completionSpec: Fig.Spec = {
  name: "nvim",
  description: "",
  subcommands: [
    {
      name: "`git status --porcelain | sed -ne 's/^ M //p'`",
      description: "Example subcommand",
      subcommands: [
        {
          name: "my_nested_subcommand",
          description:
            "Nested subcommand, example usage: '+ my_subcommand my_nested_subcommand'",
        },
      ],
    },
  ],
  options: [
    {
      name: ["--help", "-h"],
      description: "Show help for +",
    },
  ],
  // Only uncomment if + takes an argument
  // args: {}
};
export default completionSpec;
