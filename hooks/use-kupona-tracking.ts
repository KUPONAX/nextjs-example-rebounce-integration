import { useEffect } from "react";

/**
 * useKuponaTracking
 * Setzt globale Kupona-Tracking-Variablen auf window, wenn Daten geladen sind.
 * @param pagetype "productdetail" | "category" etc. Default ist "startpage"
 * @param productId string | number | Array<string|number>
 * @param categoryId string | number
 */
export function useKuponaTracking({
  pagetype = "startpage",
  productId,
  categoryId,
}: {
  pagetype: string;
  productId?: string | number | Array<string | number>;
  categoryId?: string | number;
}) {
  useEffect(() => {
    window.kp_site = pagetype;

    if (productId !== undefined) {
      window.kp_product_id = Array.isArray(productId)
        ? productId.join(",")
        : productId;
    }
    if (categoryId !== undefined) {
      window.kp_category_id = categoryId;
    }
  }, [pagetype, productId, categoryId]);
}
