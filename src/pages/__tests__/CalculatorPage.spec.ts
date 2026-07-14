import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorPage from '../CalculatorPage.vue'

const mountPage = () =>
  mount(CalculatorPage, {
    global: {
      stubs: { RouterLink: { template: '<a><slot /></a>' } },
      directives: { reveal: {} },
    },
  })

describe('CalculatorPage', () => {
  it('shows transparent pricing for all three tiers', () => {
    const wrapper = mountPage()
    const text = wrapper.text()

    expect(text).toContain('Workstation')
    expect(text).toContain('Rack Unit')
    expect(text).toContain('Enterprise Node')
    expect(text).toContain('€19,000')
    expect(text).toContain('€58,000')
    expect(text).toContain('€340,000')
    expect(text).toContain('Request a quote')
  })

  it('renders the payback configurator inputs and a configuration summary', () => {
    const wrapper = mountPage()

    expect(wrapper.text()).toContain('What will it run?')
    expect(wrapper.text()).toContain('People using it')
    expect(wrapper.text()).toContain('Current monthly AI spend')
    expect(wrapper.text()).toContain('Your configuration')
  })

  it('recommends the rack unit as soon as fine-tuning is selected', async () => {
    const wrapper = mountPage()

    // Defaults: 40 assistant users -> Tier 1
    expect(wrapper.text()).toContain('Tier 1 — Workstation')

    const train = wrapper
      .findAll('button[role="radio"]')
      .find((button) => button.text().includes('Fine-tuning'))
    expect(train).toBeDefined()
    await train!.trigger('click')

    expect(wrapper.text()).toContain('Tier 2 — Rack Unit')
  })

  it('shows payback and the three-year comparison for default inputs', () => {
    const wrapper = mountPage()
    const text = wrapper.text()

    expect(text).toMatch(/\d+\.\d/)
    expect(text).toContain('months')
    expect(text).toContain('Keep renting')
    expect(text).toContain('Own the node')
    expect(text).toContain('/month')
  })

  it('prefills the quote request with the chosen configuration', () => {
    const wrapper = mountPage()
    const quoteLink = wrapper
      .findAll('a')
      .find((a) => a.attributes('href')?.startsWith('mailto:sales@') && a.text().includes('Tier 1'))
    expect(quoteLink).toBeDefined()
    const href = quoteLink!.attributes('href')!
    expect(decodeURIComponent(href)).toContain('Team size: 40')
    expect(decodeURIComponent(href)).toContain('Tier 1 Workstation')
  })
})
