import { ISLANDS_INFO } from './config';
import { removeOverlay } from './mapUtils';
import { appState } from './state';

/**
 * 島選択ボタンを生成してDOMに追加
 */
export function createIslandSelector(): void {
  const selectorContainer = document.createElement('div');
  selectorContainer.className = 'island-selector';

  const title = document.createElement('h3');
  title.textContent = '島を選択:';
  selectorContainer.appendChild(title);

  ISLANDS_INFO.forEach(island => {
    const button = document.createElement('button');
    button.className = `island-btn ${island.id === appState.currentIslandId ? 'active' : ''}`;
    button.dataset.islandId = island.id;
    button.onclick = () => selectIsland(island.id);

    // アイコンとテキストを設定
    button.innerHTML = `
      <div class="island-icon">
        <img src="${island.iconPath}" alt="${island.name}" />
      </div>
      <span class="island-name">${island.name}</span>
    `;

    selectorContainer.appendChild(button);
  });

  // ヘッダーに追加
  const header = document.querySelector('.header');
  if (header) {
    header.appendChild(selectorContainer);
  }
}

/**
 * 島を選択する
 * @param islandId - 選択する島のID
 */
export function selectIsland(islandId: string): void {
  // 既存のオーバーレイがあれば削除
  if (appState.isOverlayVisible && appState.map) {
    removeOverlay(appState.map);
    appState.isOverlayVisible = false;
  }

  appState.currentIslandId = islandId;

  // ボタンのアクティブ状態を更新
  updateButtonStates();
}

/**
 * ボタンのアクティブ状態を更新
 */
function updateButtonStates(): void {
  const currentIslandId = appState.currentIslandId;

  document.querySelectorAll('.island-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const selectedButton = document.querySelector(`[data-island-id="${currentIslandId}"]`);
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
}
