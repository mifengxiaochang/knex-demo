exports.showBanner = (name = "koa2", version = "1.0.1") => {
  const tpl = `
###############################################################
  _ _ _ _     _    _ _ _ _           __      _ _ _ _ _    _ _ _ _         ___   ___    ______        __
  |       |  |_|  |  _ _  \\         /  \\    |_ _   _ _|  |  _ _ _|        |  |  /  /   / ——   \\      /  \\
  |       |   _   | |   \\  \\       / /\\ \\       | |      | |_ _ _         |  |_/  /   | |  |  |     /    \\
  |_ _ _ _|  | |  | |    / /      / /__\\ \\      | |      |  _ _ _|        |      /    | |  |  |    /  /\\  \\
  |          | |  | | _ / /      / /    \\ \\     | |      | |              |  \\  \\     | |  |  |   |   __   |
  |          | |  | |   \\ \\     / /      \\ \\    | |      | |_ _ _         |  | \\  \\   | |__|  |   |  |  |  |
  |          |_|  |_|    \\_\\   /_/        \\_\\   |_|      |_ _ _ _|        |__|  \\__\\  \\______/    |__|  |__|
    
                          -----${name}  version: v${version}
###############################################################
`;
  console.log(tpl.trim());
};
