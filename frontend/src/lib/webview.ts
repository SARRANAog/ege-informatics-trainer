declare global {
  interface Window {
    pywebview?: {
      api?: {
        ping: () => Promise<unknown>;
        app_info: () => Promise<unknown>;
      };
    };
  }
}

export async function tryGetBridgeInfo(): Promise<unknown | null> {
  try {
    return await window.pywebview?.api?.app_info?.();
  } catch {
    return null;
  }
}
