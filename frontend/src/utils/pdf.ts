import {
  Template,
  Font,
  checkTemplate,
  getInputFromTemplate,
  getDefaultFont,
  DEFAULT_FONT_NAME,
} from "@pdfme/common";
import { Form, Viewer, Designer } from "@pdfme/ui";
import { generate } from "@pdfme/generator";
import {
  multiVariableText,
  text,
  line,
  table,
  rectangle,
  ellipse,
} from "@pdfme/schemas";

const fontObjList = [
  {
    fallback: true,
    label: "NotoSerifJP-Regular",
    url: "/fonts/NotoSerifJP-Regular.otf",
  },
  {
    fallback: false,
    label: "NotoSansJP-Regular",
    url: "/fonts/NotoSansJP-Regular.otf",
  },
  {
    fallback: false,
    label: DEFAULT_FONT_NAME,
    data: getDefaultFont()[DEFAULT_FONT_NAME].data,
  },
];

export const getFontsData = async () => {
  const fontDataList = (await Promise.all(
    fontObjList.map(async (font) => ({
      ...font,
      data:
        font.data ||
        (await fetch(font.url || "").then((res) => res.arrayBuffer())),
    }))
  )) as { fallback: boolean; label: string; data: ArrayBuffer }[];

  return fontDataList.reduce(
    (acc, font) => ({ ...acc, [font.label]: font }),
    {} as Font
  );
};

export const readFile = (
  file: File | null,
  type: "text" | "dataURL" | "arrayBuffer"
) => {
  return new Promise<string | ArrayBuffer>((r) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => {
      if (e && e.target && e.target.result && file !== null) {
        r(e.target.result);
      }
    });
    if (file !== null) {
      if (type === "text") {
        fileReader.readAsText(file);
      } else if (type === "dataURL") {
        fileReader.readAsDataURL(file);
      } else if (type === "arrayBuffer") {
        fileReader.readAsArrayBuffer(file);
      }
    }
  });
};

export const cloneDeep = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const getTemplateFromJsonFile = (file: File) => {
  return readFile(file, "text").then((jsonStr) => {
    const template: Template = JSON.parse(jsonStr as string);
    checkTemplate(template);
    return template;
  });
};

export const downloadJsonFile = (json: unknown, title: string) => {
  if (typeof window !== "undefined") {
    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
};

export const handleLoadTemplate = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentRef: Designer | Form | Viewer | null
) => {
  if (e.target && e.target.files) {
    getTemplateFromJsonFile(e.target.files[0])
      .then((t) => {
        if (!currentRef) return;
        currentRef.updateTemplate(t);
      })
      .catch((e) => {
        alert(`Invalid template file.
--------------------------
${e}`);
      });
  }
};

export const getPlugins = () => {
  return {
    Text: text,
    "Multi-Variable Text": multiVariableText,
    Table: table,
    Line: line,
    Rectangle: rectangle,
    Ellipse: ellipse,
  };
};

export const generatePDF = async (
  currentRef: Designer | Form | Viewer | null
) => {
  if (!currentRef) return;
  const template = currentRef.getTemplate();
  const inputs =
    typeof (currentRef as Viewer | Form).getInputs === "function"
      ? (currentRef as Viewer | Form).getInputs()
      : getInputFromTemplate(template);
  const font = await getFontsData();

  try {
    const pdf = await generate({
      template,
      inputs,
      options: {
        font,
        title: "pdfme",
      },
      plugins: getPlugins(),
    });

    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
  } catch (e) {
    alert(e + "\n\nCheck the console for full stack trace");
    throw e;
  }
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

const getTableTemplate = (
  tableContent: Array<Array<string>> = []
): Template => ({
  schemas: [
    [
      {
        name: "items",
        type: "table",
        position: {
          x: 10,
          y: 10,
        },
        width: 277,
        height: 45.75920000000001,
        content: JSON.stringify(tableContent),
        showHead: true,
        head: [
          "目",
          "補正前の額",
          "補正額",
          "計",
          "国支出金",
          "地方債",
          "その他",
          "一般財源",
          "区分",
          "金額",
          "説明",
        ],
        headWidthPercentages: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 20],
        fontName: "NotoSerifJP-Regular",
        tableStyles: {
          borderColor: "#000000",
          borderWidth: 0,
        },
        headStyles: {
          fontName: "NotoSerifJP-Regular",
          fontSize: 8,
          characterSpacing: 0,
          alignment: "center",
          verticalAlignment: "middle",
          lineHeight: 1,
          fontColor: "#000000",
          borderColor: "#000000",
          backgroundColor: "",
          borderWidth: {
            top: 0.1,
            right: 0.1,
            bottom: 0.1,
            left: 0.1,
          },
          padding: {
            top: 5,
            right: 2,
            bottom: 5,
            left: 2,
          },
        },
        bodyStyles: {
          fontName: "NotoSerifJP-Regular",
          fontSize: 6,
          characterSpacing: 0,
          alignment: "right",
          verticalAlignment: "middle",
          lineHeight: 1,
          fontColor: "#000000",
          borderColor: "#000000",
          backgroundColor: "",
          alternateBackgroundColor: "",
          borderWidth: {
            top: 0.1,
            right: 0.1,
            bottom: 0.1,
            left: 0.1,
          },
          padding: {
            top: 5,
            right: 2,
            bottom: 5,
            left: 2,
          },
        },
        columnStyles: {
          alignment: { "0": "center", "8": "center", "10": "left" },
        },
      },
    ],
  ],
  basePdf: {
    width: 297,
    height: 210,
    padding: [10, 10, 10, 10],
  },
  pdfmeVersion: "4.0.0",
});

const getBlankTemplate = () =>
  ({
    schemas: [{}],
    basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] },
  } as Template);
export const getTemplatePresets = (): {
  key: string;
  label: string;
  template: () => Template;
}[] => [
  {
    key: "table",
    label: "Table",
    template: () =>
      getTableTemplate([
        [
          "1 一般管理費",
          "8,926,009",
          "43,474",
          "8,969,483",
          "",
          "",
          "946",
          "42,528",
          "7 報償費",
          "20",
          "",
        ],
        ["", "", "", "", "", "", "946", "", "8 旅費", "403", ""],
        ["", "", "", "", "", "", "", "", "10 需用費", "20", ""],
        ["", "", "", "", "", "", "", "", "11 役務費", "125", ""],
        ["", "", "", "", "", "", "", "", "12 委託費", "41,467", ""],
        ["", "", "", "", "", "", "", "", "13 使用料及び貸借料", "20", ""],
        ["", "", "", "", "", "", "", "", "17 備品購入費", "12", ""],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "18 負担金補助及び交付金",
          "1,407",
          "",
        ],
      ]),
  },
  { key: "blank", label: "Blank", template: getBlankTemplate },
];

export const getTemplateByPreset = (templatePreset: string): Template => {
  const templatePresets = getTemplatePresets();
  const preset = templatePresets.find(
    (preset) => preset.key === templatePreset
  );
  return preset ? preset.template() : templatePresets[0].template();
};
