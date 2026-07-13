import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorPage from '../CalculatorPage.vue'

describe('CalculatorPage', () => {
  it('renders the three plain-language inputs and a recommendation', () => {
    const wrapper = mount(CalculatorPage)

    expect(wrapper.text()).toContain('What does your business spend on AI tools each month?')
    expect(wrapper.text()).toContain('How many people would use it?')
    expect(wrapper.text()).toContain('How heavily do they use it?')
    expect(wrapper.text()).toContain('Recommended hardware')
  })

  it('recommends a bigger tier when usage switches to heavy', async () => {
    const wrapper = mount(CalculatorPage)

    // Defaults: 40 regular users -> load 40 -> Tier 1
    expect(wrapper.text()).toContain('Tier 1: Workstation')

    const heavy = wrapper
      .findAll('button[role="radio"]')
      .find((button) => button.text().includes('Heavy'))
    expect(heavy).toBeDefined()
    await heavy!.trigger('click')

    // 40 heavy users -> load 88 -> Tier 2
    expect(wrapper.text()).toContain('Tier 2: Rack Unit')
  })

  it('shows a break-even estimate for the default inputs', () => {
    const wrapper = mount(CalculatorPage)
    expect(wrapper.text()).toMatch(/\d+\.\d months/)
  })
})
