function isNextVersion(version) {
  return version.includes('-rc.') || version.includes('-beta.') || version.includes('-alpha.')
}

export default isNextVersion
