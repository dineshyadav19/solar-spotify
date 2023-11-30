import html2canvas from "html2canvas";

export function convertHtmlToImage(props: { site_id: string; mobile: string }) {
  const element = document.querySelector(`#solar-${props.site_id}`) as HTMLElement | null;;

  if (element) {
    html2canvas(element).then((canvas) => {
      let anchorTag = document.createElement("a");
      document.body.appendChild(anchorTag);
      anchorTag.download = `${props.mobile}.jpg`;
      anchorTag.href = canvas.toDataURL();
      anchorTag.target = "_blank";
      anchorTag.click();
      document.body.removeChild(anchorTag);
    });
  } else {
    console.error(`Element with ID solar-${props.site_id} not found.`);
  }
}


export const processCSV = (
  str: string,
  delim: string = ","
): { [key: string]: string }[] => {
  const headers = str.slice(0, str.indexOf("\n")).split(delim);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const newArray = rows.map((row) => {
    const values = row.split(delim);
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {} as { [key: string]: string });
    return eachObject;
  });

  return newArray;
};


export const renderImageHtml = props => `
    <div class="main--container" id="solar-${props.site_id}">
      <div style="width: 100vw; height: 100vh;"></div>
      <div class="container">
        <div class="main">
          <h1 class="main--heading">
            All the care and commitment to your solar plant added up to
          </h1>

          <h2 class="main--units">${Math.round(props.gen_units)}</h2>

          <p class="main--content">
            In 2022, your solar plant generated ${Math.round(
  props.gen_units
)} units of electricity that is approximately ~ ₹
            ${(props.gen_units * 7).toFixed(1)}* and ${Math.round(
  props.offset_unit
)} Kg of Co2 Offset
          </p>
        </div>
        <footer class="footer">
          <span class="footer--title">#mysolarhome2022</span>
        </footer>
      </div>
    </div>`

export const generateImages = async (array: Array<any>) => {
  for (let i = 0; i < array.length; i++) {
    const currentRow = array[i]
    const imageHtml = renderImageHtml(currentRow)

    const imageElement = document.createElement("div")
    imageElement.innerHTML = imageHtml

    document.body.appendChild(imageElement)

    await new Promise(resolve => setTimeout(resolve, 500))

    convertHtmlToImage(currentRow)

    document.body.removeChild(imageElement)
  }
}