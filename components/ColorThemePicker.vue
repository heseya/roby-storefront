<template>
  <div class="color-theme-picker">
    <div class="color-theme-picker__input">
      <input id="primaryColor" v-model="colors.primaryColor" type="color" />
      <label for="primaryColor"> Primary Color </label>
    </div>

    <div class="color-theme-picker__input">
      <input id="primaryColorAlt" v-model="colors.primaryColorAlt" type="color" />
      <label for="primaryColorAlt"> Primary Color Alt </label>
    </div>

    <div class="color-theme-picker__input">
      <input id="secondaryColor" v-model="colors.secondaryColor" type="color" />
      <label for="secondaryColor"> Secondary Color </label>
    </div>

    <div class="color-theme-picker__input">
      <input id="errorColor" v-model="colors.errorColor" type="color" />
      <label for="errorColor"> Error Color </label>
    </div>

    <button
      class="color-theme-picker__btn color-theme-picker__btn--transparent"
      @click="restoreDefaultColors"
    >
      Wróć do domyślnych
    </button>
    <button class="color-theme-picker__btn" @click="copy">Kopiuj paletę kolorów</button>
  </div>
</template>

<script setup lang="ts">
const { notify } = useNotify()

const defaultColors = {
  primaryColor: '#ffca2b',
  secondaryColor: '#c63225',
  primaryColorAlt: '#e1a044',
  errorColor: '#f05454',
}

const parentEl = useParentElement()

const colors = useLocalStorage('colors', { ...defaultColors })

watchEffect(() => {
  if (process.server) return

  parentEl.value?.style.setProperty('--primary-color', colors.value.primaryColor)
  parentEl.value?.style.setProperty('--secondary-color', colors.value.secondaryColor)
  parentEl.value?.style.setProperty('--primary-color-alt', colors.value.primaryColorAlt)
  parentEl.value?.style.setProperty('--error-color', colors.value.errorColor)
})

const restoreDefaultColors = () => {
  colors.value = { ...defaultColors }
}

const copy = async () => {
  const css = `
--primary-color: ${colors.value.primaryColor};
--secondary-color: ${colors.value.secondaryColor};
  `

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
}
</style>
