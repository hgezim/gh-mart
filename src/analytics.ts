import { getOrGenerateVisitorId } from "./visitor";

export class Analytics {
  private siteId;
  private envURL;
  private siteCountry;

  constructor() {
    this.siteId = "blackcrow"; // TODO: bring this from env
    this.envURL = "https://api.sandbox.blackcrow.ai"; // TODO: bring this from env
    this.siteCountry = "US";
  }

  public async viewEvent() {
    await this.sendEvent("view");
  }

  public async conversionEvent(params: any) {
    await this.sendEvent("conversion", params);
  }

  private async sendEvent(name: "view" | "conversion", params?: any) {
    const eventType = name === "view" ? "view" : "purchase";
    const pageId = window.location.pathname === "/" ? "home" : "other";

    return await fetch(`${this.envURL}?event_name=${eventType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        site_id: this.siteId,
        page_id: pageId,
        visitor_id: getOrGenerateVisitorId(),
        site_country: this.siteCountry,
        ...params,
      }),
    });
  }
}
