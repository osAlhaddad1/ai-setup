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
  it('renders the three plain-language inputs and a recommendation', () => {
    const wrapper = mountPage()

    expect(wrapper.text()).toContain('Monthly AI spend')
    expect(wrapper.text()).toContain('People using AI')
    expect(wrapper.text()).toContain('How heavily?')
    expect(wrapper.text()).toContain('Recommended:')
  })

  it('recommends a bigger tier when usage switches to heavy', async () => {
    const wrapper = mountPage()

    // Defaults: 40 regular users -> load 40 -> Tier 1
    expect(wrapper.text()).toContain('Tier 1 — Workstation')

    const heavy = wrapper
      .findAll('button[role="radio"]')
      .find((button) => button.text().includes('Heavy'))
    expect(heavy).toBeDefined()
    await heavy!.trigger('click')

    // 40 heavy users -> load 88 -> Tier 2
    expect(wrapper.text()).toContain('Tier 2 — Rack Unit')
  })

  it('shows a break-even estimate for the default inputs', () => {
    const wrapper = mountPage()
    expect(wrapper.text()).toMatch(/\d+\.\d/)
    expect(wrapper.text()).toContain('months')
  })
})
