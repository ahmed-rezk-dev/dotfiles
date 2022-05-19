const completionSpec: Fig.Spec = {
  name: "pipe",
  description: "",
  subcommands: [
    {
      name: "build",
      description: "Example subcommand",
      insertValue: "git fetch && git push azure origin/main:main",
      icon: "fig://icon?type=azure",
    },
  ],
  options: [
    {
      name: ["--help", "-h"],
      description: "Push Bitbucket latest to Azure repo & Run build",
    },
  ],
  // Only uncomment if nvim takes an argument
  // args: {}
};
export default completionSpec;
