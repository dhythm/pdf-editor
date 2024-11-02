import { apiGet } from "@/api/handlers";
import { useQuery } from "@/api/hooks";
import { z } from "zod";

const PdfTemplateModel = z.object({
  name: z.string(),
  template: z.any(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const usePdfTemplates = <T = z.infer<typeof PdfTemplateModel>>(
  select?: (data: z.infer<typeof PdfTemplateModel>) => T
) => {
  return useQuery({
    queryKey: ["pdf-templates"],
    queryFn: async () => {
      const response = await apiGet("/api/pdfs/templates");
      console.log(response);
      return PdfTemplateModel.parse(response);
    },
    select,
  });
};
