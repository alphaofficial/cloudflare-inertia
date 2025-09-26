import { Context } from 'hono'

export interface InertiaPageObject {
  component: string
  props: Record<string, any>
  url: string
  version: string
}

export interface InertiaConfig {
  version?: string | (() => string)
  rootView?: string
  title?: string | ((page: InertiaPageObject) => string)
}

const HEADERS = {
  INERTIA: 'X-Inertia',
  INERTIA_VERSION: 'X-Inertia-Version',
  INERTIA_LOCATION: 'X-Inertia-Location',
  INERTIA_PARTIAL_DATA: 'X-Inertia-Partial-Data',
  INERTIA_PARTIAL_COMPONENT: 'X-Inertia-Partial-Component',
}

export class InertiaAdapter {
  private config: InertiaConfig

  constructor(config: InertiaConfig) {
    this.config = config
  }

  private getVersion(): string {
    if (typeof this.config.version === 'function') {
      return this.config.version()
    }
    return this.config.version || '1'
  }

  private isInertiaRequest(c: Context): boolean {
    return c.req.header(HEADERS.INERTIA) === 'true'
  }

  public render(c: Context, component: string, props: Record<string, any> = {}): Response | InertiaPageObject {
    const page: InertiaPageObject = {
      component,
      props,
      url: c.req.url,
      version: this.getVersion()
    }

    if (this.isInertiaRequest(c)) {
      // Handle partial reloads
      const partialData = c.req.header(HEADERS.INERTIA_PARTIAL_DATA)
      const partialComponent = c.req.header(HEADERS.INERTIA_PARTIAL_COMPONENT)

      if (partialData && partialComponent === component) {
        const only = partialData.split(',').map(key => key.trim())
        const filteredProps: Record<string, any> = {}
        
        only.forEach(key => {
          if (key in props) {
            filteredProps[key] = props[key]
          }
        })
        
        page.props = filteredProps
      }

      return c.json(page, 200, {
        'Content-Type': 'application/json',
        [HEADERS.INERTIA]: 'true',
        'Vary': 'Accept'
      })
    }

    // Return page data for HTML rendering
    return page
  }
}