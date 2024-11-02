import { apiGet } from "@/api/handlers";
import { useQuery } from "@/api/hooks";
import { z } from "zod";

const PdfTemplateModel = z.object({
  name: z.string(),
  template: z.any(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
const PdfTemplateListModel = PdfTemplateModel.array();

export const usePdfTemplates = <T = z.infer<typeof PdfTemplateListModel>>(
  select?: (data: z.infer<typeof PdfTemplateListModel>) => T
) => {
  return useQuery({
    queryKey: ["pdf-templates"],
    queryFn: async () => {
      const response = await apiGet("/api/pdfs/templates/");
      return PdfTemplateListModel.parse(response);
    },
    select,
  });
};

const PdfTemplateDataModel = z.object({
  data: z.array(z.array(z.string())),
});

export const usePdfTemplatesData = <T = z.infer<typeof PdfTemplateDataModel>>(
  select?: (data: z.infer<typeof PdfTemplateDataModel>) => T
) => {
  return useQuery({
    queryKey: ["pdf-templates"],
    queryFn: async () => {
      const response = await apiGet("/api/pdfs/templates/data/");
      return PdfTemplateDataModel.parse(response);
    },
    select,
  });
};
