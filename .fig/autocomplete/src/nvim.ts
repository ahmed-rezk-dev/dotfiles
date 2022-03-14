const completionSpec: Fig.Spec = {
  name: "nvim",
  description: "",
  subcommands: [
    {
      name: "git",
      description: "Example subcommand",
      insertValue: "`git status --porcelain | sed -ne 's/^ M //p'`",
      /* subcommands: [{
      name: "my_nested_subcommand",
      description: "Nested subcommand, example usage: 'nvim my_subcommand my_nested_subcommand'"
    }], */
    },
  ],
  options: [
    {
      name: ["--help", "-h"],
      description: "Show help for nvim",
    },
  ],
  // Only uncomment if nvim takes an argument
  // args: {}
};
export default completionSpec;
