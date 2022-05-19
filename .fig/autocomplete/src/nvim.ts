const completionSpec: Fig.Spec = {
  name: "nvim",
  description: "",
  subcommands: [
    {
      name: "git",
      description:
        "Using Git to Open Modified or Changed Files Since Previous Commit",
      insertValue:
        "`echo $(git diff --name-only HEAD~ HEAD) $(git status --porcelain | awk '{print $2}')`",
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
