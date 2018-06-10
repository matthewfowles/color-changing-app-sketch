const sketch = require("sketch");

const getColors = document => {
  const page = document.pages.find(item => item.name === "lucid-colors");

  if (page) {
    const currentArtboards = page.layers.filter(
      layer => layer.type === "Artboard"
    );

    if (currentArtboards.length === -1) {
      return null;
    }

    const artboards = currentArtboards.map(artboard => ({
      color: artboard.layers[0].style.fills[0].color,
      name: artboard.name
    }));

    const colors = {};

    artboards.forEach(artboard => {
      colors[artboard.name] = artboard.color;
    });

    return colors;
  }

  return null;
};

const postColors = colors =>
  fetch("https://color-changing-app-backend-lviiovodcv.now.sh", {
    method: "POST",
    body: JSON.stringify(colors),
    headers: {
      "Content-Type": "application/json"
    }
  });

const success = context => {
  context.document.showMessage("Yay you are synced 🙌");
};

const error = context => {
  context.document.showMessage("There was an error 😡");
};

export default function(context) {
  const document = sketch.fromNative(context.document);
  const colors = getColors(document);

  if (colors) {
    postColors(colors)
      .then(() => success(context))
      .catch(() => error(context));
  }
}
