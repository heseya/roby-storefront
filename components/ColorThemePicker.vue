<template>
  <div class="color-theme-picker" :class="{ 'color-theme-picker--visible': isVisible }">
    <div
      v-for="colorKey in Object.keys(cssVariables)"
      :key="colorKey"
      class="color-theme-picker__input"
    >
      <input :id="colorKey" v-model="colors[colorKey as ColorKeys]" type="color" />
      <label :for="colorKey">
        {{ t(`colors.${colorKey}`) }} <br />
        ({{ colors[colorKey as ColorKeys] }})
      </label>
    </div>

    <button
      class="color-theme-picker__btn color-theme-picker__btn--transparent"
      @click="restoreDefaultColors"
    >
      {{ t('actions.restoreDefault') }}
    </button>
    <button class="color-theme-picker__btn" @click="copy">{{ t('actions.copy') }}</button>

    <button class="color-theme-picker__hide-btn" @click="isVisible = !isVisible">
      <LayoutIcon
        :icon="ChevronIcon"
        :size="12"
        :style="{
          transform: `rotate(${isVisible ? 180 : 0}deg)`,
        }"
      />
    </button>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "colors": {
      "primaryColor": "Kolor główny",
      "secondaryColor": "Kolor dodatkowy",
      "primaryColorAlt": "Kolor główny alternatywny",
      "highlightColor": "Kolor podświetlenia",
      "errorColor": "Kolor błędu",
      "warningColor": "Kolor ostrzeżenia"
    },
    "actions": {
      "restoreDefault": "Wróć do domyślnych",
      "copy": "Kopiuj paletę kolorów"
    }
  },
  "en": {
    "colors": {
      "primaryColor": "Primary color",
      "secondaryColor": "Secondary color",
      "primaryColorAlt": "Primary alternative color",
      "errorColor": "Error color"
    },
    "actions": {
      "restoreDefault": "Restore default",
      "copy": "Copy color palette"
    }
  }
}
</i18n>

<script setup lang="ts">
import ChevronIcon from '@/assets/icons/chevron.svg?component'
import { useConfigStore } from '~/store/config'

const { notify } = useNotify()
const t = useLocalI18n()
const config = useConfigStore()

const safeToString = (value: string | number | undefined): undefined | string =>
  typeof value === 'number' ? value.toString() : value

type ColorKeys =
  | 'primaryColor'
  | 'primaryColorAlt'
  | 'secondaryColor'
  | 'highlightColor'
  | 'errorColor'
  | 'warningColor'

const defaultColors = computed<Record<ColorKeys, string>>(() => ({
  primaryColor: safeToString(config.env.primary_color) || '#ffca2b',
  primaryColorAlt: safeToString(config.env.primary_color_alt) || '#e1a044',
  secondaryColor: safeToString(config.env.secondary_color) || '#c63225',
  highlightColor: safeToString(config.env.highlight_color) || '#c63225',
  errorColor: safeToString(config.env.error_color) || '#f05454',
  warningColor: safeToString(config.env.warning_color) || '#ffca2b',
}))

const cssVariables: Record<ColorKeys, string> = {
  primaryColor: '--primary-color',
  primaryColorAlt: '--primary-color-alt',
  secondaryColor: '--secondary-color',
  highlightColor: '--highlight-color',
  errorColor: '--error-color',
  warningColor: '--warning-color',
}

const isVisible = ref(false)
const colors = useLocalStorage('colors', { ...defaultColors.value })

watchEffect(() => {
  if (process.server) return

  Object.entries(cssVariables).forEach(([key, value]) => {
    // This is highly invasive as its overrides styles in all DOM elements, but it is debug feature so its okey
    document.querySelectorAll(`[data-theme-context], [style]`).forEach((el) => {
      ;(el as HTMLElement).style.setProperty(value, `${colors.value[key as ColorKeys]}`)
    })
  })
})

const restoreDefaultColors = () => {
  colors.value = { ...defaultColors.value }
}

const copy = async () => {
  const css = Object.entries(cssVariables).reduce((acc, [key, value]) => {
    return `${acc}\n${value}: ${colors.value[key as ColorKeys]};`
  }, '')

  await navigator.clipboard.writeText(css)

  notify({
    title: 'Skopiowano',
    text: 'Paleta kolorów została skopiowana do schowka',
    type: 'success',
  })
}
</script>

<style lang="scss" scoped>
.color-theme-picker {
  position: fixed;
  left: 20px;
  bottom: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  padding-top: 8px;
  transform: translateX(calc(-100% - 20px));
  transition: 0.3s;

  &--visible {
    transform: none;
  }

  &__input {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    position: relative;

    input {
      background-color: transparent;
      border: none;
      padding: 0 10px;
      width: 100%;
      height: 48px;
      cursor: pointer;

      &::-webkit-color-swatch {
        border: none;
        border-radius: 4px;
      }
    }

    label {
      position: absolute;
      width: 100%;
      text-align: center;
      pointer-events: none;
      font-weight: 500;
      font-size: rem(12);
    }
  }

  &__btn {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #eee;
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    color: #333;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #ddd;
    }

    &--transparent {
      background-color: transparent;
      color: #333;

      &:hover {
        background-color: #fafafa;
      }
    }
  }

  &__hide-btn {
    all: unset;
    position: absolute;
    left: 100%;
    bottom: 3em;
    background-color: #fff;
    padding: 4px 8px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    color: $gray-color-600;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 0;
      height: 100%;
      width: 16px;
      background-color: #fff;
      pointer-events: none;
    }
  }
}
</style>
