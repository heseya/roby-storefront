export const useLocalI18n = () => {
  const { t } = useI18n({
    useScope: 'local',
  })
  return t
}

export const useGlobalI18n = () => {
  const { t } = useI18n({
    useScope: 'global',
  })
  return t
}
