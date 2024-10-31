import { Template, checkTemplate, cloneDeep } from "@pdfme/common";
import { useRef, useState } from "react";
import { Designer as UiDesigner } from "@pdfme/ui";
import {
  getTemplateByPreset,
  getFontsData,
  getPlugins,
  readFile,
  downloadJsonFile,
  handleLoadTemplate,
  generatePDF,
  getTemplatePresets,
} from "./utils";

const headerHeight = 80;

const initialTemplatePresetKey = "invoice";
const customTemplatePresetKey = "custom";

const templatePresets = getTemplatePresets();

export function Editor() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<UiDesigner | null>(null);
  const [templatePreset, setTemplatePreset] = useState<string>(
    localStorage.getItem("templatePreset") || initialTemplatePresetKey
  );
  const [prevDesignerRef, setPrevDesignerRef] = useState<UiDesigner | null>(
    null
  );

  const buildDesigner = () => {
    let template: Template = getTemplateByPreset(
      localStorage.getItem("templatePreset") || ""
    );
    try {
      const templateString = localStorage.getItem("template");
      if (templateString) {
        setTemplatePreset(customTemplatePresetKey);
      }

      const templateJson = templateString
        ? JSON.parse(templateString)
        : getTemplateByPreset(localStorage.getItem("templatePreset") || "");
      checkTemplate(templateJson);
      template = templateJson as Template;
    } catch {
      localStorage.removeItem("template");
    }

    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new UiDesigner({
          domContainer: designerRef.current,
          template,
          options: {
            font,
            lang: "ja",
            labels: {
              clear: "🗑️", // Add custom labels to consume them in your own plugins
            },
            theme: {
              token: {
                colorPrimary: "#25c2a0",
              },
            },
            icons: {
              multiVariableText:
                '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>',
            },
          },
          plugins: getPlugins(),
        });
        designer.current.onSaveTemplate(onSaveTemplate);
        designer.current.onChangeTemplate(() => {
          setTemplatePreset(customTemplatePresetKey);
        });
      }
    });
  };

  const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf,
            })
          );
        }
      });
    }
  };

  const onDownloadTemplate = () => {
    if (designer.current) {
      downloadJsonFile(designer.current.getTemplate(), "template");
      console.log(designer.current.getTemplate());
    }
  };

  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      localStorage.setItem(
        "template",
        JSON.stringify(template || designer.current.getTemplate())
      );
      alert("Saved!");
    }
  };

  const onChangeTemplatePresets = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplatePreset(e.target.value);
    localStorage.setItem(
      "template",
      JSON.stringify(
        getTemplateByPreset(localStorage.getItem("templatePreset") || "")
      )
    );
    localStorage.removeItem("template");
    localStorage.setItem("templatePreset", e.target.value);
    buildDesigner();
  };

  if (designerRef != prevDesignerRef) {
    if (prevDesignerRef && designer.current) {
      designer.current.destroy();
    }
    buildDesigner();
    setPrevDesignerRef(designerRef);
  }

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 1rem",
          fontSize: "small",
        }}
      >
        <strong>Designer</strong>
        <span style={{ margin: "0 1rem" }}>:</span>
        <label>
          Template Preset:{" "}
          <select onChange={onChangeTemplatePresets} value={templatePreset}>
            {templatePresets.map((preset) => (
              <option
                key={preset.key}
                disabled={preset.key === customTemplatePresetKey}
                value={preset.key}
              >
                {preset.label}
              </option>
            ))}
          </select>
        </label>
        <span style={{ margin: "0 1rem" }}>/</span>
        <span style={{ margin: "0 1rem" }}>/</span>
        <label style={{ width: 180 }}>
          Change BasePDF
          <input
            type="file"
            accept="application/pdf"
            onChange={onChangeBasePDF}
          />
        </label>
        <span style={{ margin: "0 1rem" }}>/</span>
        <label style={{ width: 180 }}>
          Load Template
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              handleLoadTemplate(e, designer.current);
              setTemplatePreset(customTemplatePresetKey);
            }}
          />
        </label>
        <span style={{ margin: "0 1rem" }}>/</span>
        <button onClick={onDownloadTemplate}>Download Template</button>
        <span style={{ margin: "0 1rem" }}>/</span>
        <button onClick={() => onSaveTemplate()}>Save Template</button>
        <span style={{ margin: "0 1rem" }}>/</span>
        <button onClick={() => generatePDF(designer.current)}>
          Generate PDF
        </button>
      </header>
      <div
        ref={designerRef}
        style={{ width: "100%", height: `calc(100vh - ${headerHeight}px)` }}
      />
    </div>
  );
}
