import type { API, FileInfo } from "jscodeshift";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift.withParser("tsx");

  const $j = j(file.source);

  return $j
    .find(j.ImportDeclaration, { source: { value: "chakra-react-select" } })
    .forEach((path) => {
      const selectImport = j(path).find(j.ImportSpecifier);

      if (selectImport.size() === 0) {
        return;
      }

      // Find the names each of the four base Select components was imported as
      const variableNames: string[] = [];

      [
        "Select",
        "AsyncSelect",
        "CreatableSelect",
        "AsyncCreatableSelect",
      ].forEach((selectName) => {
        const variableIdentifier = j(path)
          .find(j.ImportSpecifier)
          .filter((importPath) => importPath.node.imported.name === selectName)
          .find(j.Identifier);

        if (variableIdentifier.size() === 0) {
          return;
        }

        const variableName = variableIdentifier.get("name").value;

        if (variableName) {
          variableNames.push(variableName);
        }
      });

      if (!variableNames.length) {
        return;
      }

      variableNames.forEach((variableName) => {
        const selectElements = $j.findJSXElements(variableName);

        selectElements.forEach((selectPath) => {
          const $select = j(selectPath);

          if ($select.size() === 0) {
            return;
          }

          // Remove `useBasicStyles` prop from all Select components
          $select
            .find(j.JSXAttribute)
            .filter((nodePath) => nodePath.node.name.name === "useBasicStyles")
            .remove();

          // Remove `hasStickyGroupHeaders` prop from all Select components
          $select
            .find(j.JSXAttribute)
            .filter(
              (nodePath) => nodePath.node.name.name === "hasStickyGroupHeaders"
            )
            .remove();

          // Replace `selectedOptionColor` prop with `selectedOptionColorScheme`
          $select
            .find(j.JSXAttribute)
            .filter(
              (nodePath) => nodePath.node.name.name === "selectedOptionColor"
            )
            .forEach((attribute) =>
              j(attribute).replaceWith(
                j.jsxAttribute(
                  j.jsxIdentifier("selectedOptionColorScheme"),
                  attribute.node.value
                )
              )
            );

          // TODO: Decide if I want to rename this one
          // Replace `colorScheme` prop with `tagColorScheme`
          // $select
          //   .find(j.JSXAttribute)
          //   .filter((nodePath) => nodePath.node.name.name === "colorScheme")
          //   .forEach((attribute) =>
          //     j(attribute).replaceWith(
          //       j.jsxAttribute(
          //         j.jsxIdentifier("tagColorScheme"),
          //         attribute.node.value
          //       )
          //     )
          //   );
        });
      });
    })
    .toSource();
}
