export const useLocalI18n = () => {
  const { t } = useI18n({
    useScope: 'local',
  })
  return t
}
