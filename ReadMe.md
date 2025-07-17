# Next.js Beispiel: Integration des rebounce Mastertags

Dieses Projekt demonstriert, wie der **rebounce Mastertag** (Kupona Tracking) in ein modernes **Next.js-Projekt** integriert werden kann. Ziel ist es, das Tracking **sauber, modular und wartbar** in eine App einzubinden – ohne Copy-Paste-Spaghetti.

---

## 1. Tracking-Script im Layout einbinden

Um das Kupona-Tracking auf **allen Seiten** der Anwendung verfügbar zu machen, wird das Script global in `app/layout.tsx` eingebunden. Dies geschieht mit dem Next.js `<Script>`-Component und der Option `strategy="beforeInteractive"`.

Das Script wird dadurch **bereits vor der Ausführung anderer Skripte** geladen und steht so früh wie möglich im Ladeprozess zur Verfügung. Das ist wichtig, damit wirklich **alle Pageviews zuverlässig erfasst** werden – auch bei schnellem Routing oder Lazy-Loading.

```tsx
<Script
  strategy="beforeInteractive"
  src="https://retrack-kupona.kuponacdn.de/customers/12345.min.js"
/>
```

_(Die URL mit der korrekten ID wird dir von uns mitgeteilt.)_

---

## 2. Tracking-Logik per Hook (`hooks/use-kupona-tracking.ts`)

Die Tracking-Logik ist in einem eigenen **React-Hook** gekapselt. So ist sie:

- **zentralisiert**
- **leicht wiederverwendbar**
- **fehlerfrei wartbar**

### Was der Hook macht

Der Hook `useKuponaTracking` setzt folgende globale Variablen auf dem `window`-Objekt:

| Variable                | Beschreibung                                           |
| ----------------------- | ------------------------------------------------------ |
| `window.kp_site`        | Page-Typ (z. B. `"productdetail"`, `"category"` usw.)  |
| `window.kp_product_id`  | Produkt-ID oder Liste (z. B. `"123"` oder `"123,456"`) |
| `window.kp_category_id` | Kategorie-ID (z. B. `"shoes"`)                         |

Diese Variablen werden vom eingebundenen Kupona-Script regelmäßig abgefragt, um Tracking auszulösen. **Es ist keine weitere Aktion nötig.**

---

### Wichtig: Zeitpunkt beachten

Die Variablen sollten **erst gesetzt werden, wenn die nötigen Daten vorhanden sind** – z. B. nach einem API-Fetch. Andernfalls erkennt das Script sie nicht rechtzeitig und das Tracking bleibt aus.

---

### Beispiel-Implementierung der Hook

```ts
import { useEffect } from "react";

/**
 * useKuponaTracking
 * Setzt globale Kupona-Tracking-Variablen auf window, wenn Daten geladen sind.
 *
 * @param pagetype z. B. "productdetail", "category", "startpage" (Default)
 * @param productId Produkt-ID (string, number oder Array)
 * @param categoryId Kategorie-ID (string oder number)
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
```

---

## 3. Verwendung des Tracking-Hooks

### Produktdetailseite (`app/product/[id]/page.tsx`):

```tsx
useKuponaTracking({
  pagetype: "productdetail",
  productId: product?.id,
  categoryId: product?.category,
});
```

### Kategorieseite (`app/category/[category]/page.tsx`):

```tsx
useKuponaTracking({
  pagetype: "category",
  productId: products?.map((p) => p.id),
  categoryId: category,
});
```

> Wenn du eine **Liste von Produkten** übergibst (z. B. bei Kategorien), übergib sie einfach als Array. Die Hook wandelt es automatisch in `"123,456,789"` um.

---

## 4. Typen (für TypeScript-Projekte)

Wenn du TypeScript verwendest, solltest du `types/global.d.ts` im Projekt anlegen, damit die globalen Variablen typisiert sind:

```ts
// types/global.d.ts
export {};

declare global {
  interface Window {
    kp_site?: string | number;
    kp_product_id?: number | string;
    kp_category_id?: string | number;
  }
}
```

> Stelle sicher, dass dieser Ordner in deiner `tsconfig.json` unter `"include"` eingetragen ist.

---

## 5. Wie funktioniert das Tracking genau?

Das eingebundene Kupona-Script prüft automatisch, ob die oben genannten Variablen auf dem `window`-Objekt gesetzt wurden. Dafür fragt es in kurzen Abständen (alle 250 ms) bis zu 10 Mal nach – **abhängig vom Page-Type**.

Sobald eine Variable vorhanden ist (z. B. `kp_product_id` bei `"productdetail"`), wird das Tracking ausgelöst.
Es ist **nicht nötig**, ein Event manuell zu senden.

---

## Zusammenfassung

| Punkt              | Erklärung                                      |
| ------------------ | ---------------------------------------------- |
| Einfacher Einbau   | Nur Hook + `<Script>` notwendig                |
| Keine Events nötig | Tracking wird automatisch ausgelöst            |
| Flexible Nutzung   | Auf beliebigen Seitentypen möglich             |
| Hook ist sicher    | Wird nur ausgeführt, wenn Daten vorhanden sind |

---

**Diese Dokumentation kann als Grundlage für die Integration des rebounce Mastertags in eigene Next.js-Projekte verwendet werden.**

Bei Fragen zur Implementierung oder Erweiterung sprich dein Kupona-Team an. 💬
