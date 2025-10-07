type TDomainAbbr = Record<'abbr' | 'suffix', string>

const domainMap: Record<string, TDomainAbbr> = {
  welcometothejungle: {
    abbr: 'uetuja',
    suffix: 'is-hiring-for-multiple-jobs',
  },
}

export const getDomainAbbr = (domain = ''): TDomainAbbr =>
  Object.prototype.hasOwnProperty.call(domainMap, domain)
    ? domainMap[domain]
    : { abbr: '', suffix: '' }
