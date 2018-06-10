const sketch = require("sketch/dom");
const UI = require("sketch/ui");

const createColour = (page, name) => {
  const currentArtboards = page.layers.filter(
    layer => layer.type === "Artboard"
  );

  const x = 350 * (currentArtboards.length % 3);
  const y =
    350 * ((currentArtboards.length - (currentArtboards.length % 3)) / 3);

  const shape = new sketch.Shape({
    name: "color",
    frame: new sketch.Rectangle(0, 0, 300, 300),
    style: {
      fills: [{ color: "#A71414", fill: sketch.Style.FillType.Color }]
    }
  });

  new sketch.Artboard({
    name,
    parent: page,
    flowStartPoint: true,
    frame: new sketch.Rectangle(x, y, 300, 300),
    layers: [shape]
  });
};

const getName = () => UI.getStringFromUser("Color Name", "");

const createPage = document =>
  new sketch.Page({
    name: "lucid-colors",
    parent: document,
    frame: new sketch.Rectangle(0, 0, 500, 500)
  });

const checkPageExists = document =>
  document.pages.find(page => page.name === "lucid-colors") ||
  createPage(document);

const create = context => {
  const document = sketch.fromNative(context.document);
  const page = checkPageExists(document);
  console.log(document.pages.find(page => page.name === "lucid-colors"));
  const name = getName().replace(" ", "-");

  createColour(page, name);
};

export default create;
