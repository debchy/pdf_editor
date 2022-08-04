import { Designer, Template, checkTemplate } from "@pdfme/ui";
    import { generate } from "@pdfme/generator";

    let template= {schemas: [], sampledata:[], columns:[], basePdf:""} ;
    let designer = new Designer({
        domContainer: document.getElementById("designer"),
        template,
    });
    //designer.current.onSaveTemplate(onSaveTemplate);
    document.getElementById("load_pdf").addEventListener("change",onChangeBasePDF)
    const onChangeBasePDF = (e) => {
      if (e.target && e.target.files) {
        readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
          designer.updateTemplate(
              Object.assign(cloneDeep(template.getTemplate()), {
                basePdf,
              })
          );
        });
      }
      
    };


    const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));
    const readFile = (  file,  type) => {
      return new Promise((r) => {
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