import { test, expect } from "@playwright/test";

test("Create hotspot by filling popup and saving", async ({ page }) => {
  await page.goto("/escape-room");

  // Wait for map
  const map = page.locator('img[alt="Escape Room"]');
  await map.waitFor({ state: "visible", timeout: 10000 });

  // Click center of map
  const box = await map.boundingBox();
  if (!box) throw new Error("Map not found");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  // Wait for popup to appear 
  const popupOverlay = page.locator('div.fixed.inset-0:has-text("Add Hotspot")');
  await expect(popupOverlay).toBeVisible();

  const popupBox = popupOverlay.locator('div.bg-white');

  // Fill Question and Correct Answer
  await popupBox.locator('label:has-text("Question:") >> xpath=following-sibling::input').fill("What is 2+2?");
  await popupBox.locator('label:has-text("Correct Answer:") >> xpath=following-sibling::input').fill("4");

  // Click Save
  await popupBox.locator('button:has-text("Save")').click();

  // Confirm popup disappeared
  await expect(popupOverlay).toHaveCount(0);
});
