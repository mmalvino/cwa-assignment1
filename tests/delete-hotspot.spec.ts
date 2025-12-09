import { test, expect } from "@playwright/test";

test("Delete existing hotspot", async ({ page }) => {
  await page.goto("/escape-room");

  // Wait for map
  const map = page.locator('img[alt="Escape Room"]');
  await map.waitFor({ state: "visible", timeout: 10000 });

  // Click the same hotspot (center of map)
  const box = await map.boundingBox();
  if (!box) throw new Error("Map not found");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  // Wait for popup to appear
  const popupOverlay = page.locator('div.fixed.inset-0:has-text("Edit Hotspot")');
  await expect(popupOverlay).toBeVisible();

  // Inner box inside overlay
  const popupBox = popupOverlay.locator('div.bg-white');

  // Click Delete button
  await popupBox.locator('button:has-text("Delete")').click();

  // Confirm popup disappeared
  await expect(popupOverlay).toHaveCount(0);
});
