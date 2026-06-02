import * as Flags from 'country-flag-icons/react/3x2'

function toIconCode(code) {
  if (!code || code === 'xx') return null
  return code.toUpperCase().replace('-', '_')
}

export default function Flag({ code, className = 'w-6' }) {
  const iconCode = toIconCode(code)
  if (!iconCode) {
    return <span className={`${className} rounded-sm bg-[#e5e5e5] dark:bg-[#333] inline-block`} />
  }

  const FlagComponent = Flags[iconCode]
  if (!FlagComponent) {
    return <span className={`${className} rounded-sm bg-[#e5e5e5] dark:bg-[#333] inline-block`} />
  }

  return <FlagComponent className={`${className} rounded-sm flex-shrink-0`} />
}
