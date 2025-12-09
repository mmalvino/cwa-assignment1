import { test, expect } from "@playwright/test";

test("Play mode: solve hotspot to win", async ({ page }) => {
  await page.goto("/escape-room");

  // Builder Mode: create hotspot 
  const map = page.locator('img[alt="Escape Room"]');
  await map.waitFor({ state: "visible", timeout: 10000 });

  const box = await map.boundingBox();
  if (!box) throw new Error("Map not found");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  // Wait for builder popup
  const popupOverlay = page.locator('div.fixed.inset-0:has-text("Add Hotspot")');
  await expect(popupOverlay).toBeVisible();

  const popupBox = popupOverlay.locator('div.bg-white');

  await popupBox.locator('label:has-text("Question:") >> xpath=following-sibling::input').fill("What is 2+2?");
  await popupBox.locator('label:has-text("Correct Answer:") >> xpath=following-sibling::input').fill("4");

  await popupBox.locator('button:has-text("Save")').click();
  await expect(popupOverlay).toHaveCount(0);

  // Start Game (switch to play mode)
  await page.locator('button:has-text("Save & Start Game")').click();

  // Play Mode: click hotspot 
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  // Wait for play popup
  const playPopup = page.locator('div.fixed.inset-0:has-text("Solve the Riddle")');
  await expect(playPopup).toBeVisible();

  // Fill answer and submit
  const input = playPopup.locator('input[placeholder="Enter your answer..."]');
  await input.fill("4");

  await playPopup.locator('button:has-text("Submit")').click();

  // Verify win modal 
  const winModal = page.locator('div.fixed.inset-0:has-text("Congratulations!")');
  await expect(winModal).toBeVisible();
});