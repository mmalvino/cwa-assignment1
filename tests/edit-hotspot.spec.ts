import { test, expect } from "@playwright/test";

test("Edit existing hotspot", async ({ page }) => {
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

  // Fill new Question and Correct Answer
  await popupBox.locator('label:has-text("Question:") >> xpath=following-sibling::input').fill("What is 3+3?");
  await popupBox.locator('label:has-text("Correct Answer:") >> xpath=following-sibling::input').fill("6");

  // Click Save
  await popupBox.locator('button:has-text("Save")').click();

  // Confirm popup disappeared
  await expect(popupOverlay).toHaveCount(0);
});
