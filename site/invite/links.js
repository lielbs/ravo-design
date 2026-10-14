export function invitationTargets(hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const token = params.get('invite')?.trim() ?? ''
  const storeId = params.get('store')?.trim() ?? ''
  const valid = token.length > 0 && token.length <= 2048 && !/[\u0000-\u001f\u007f]/.test(token)
  return {
    valid,
    appUrl: valid ? 'ravo://open?invite=' + encodeURIComponent(token) : null,
    storeUrl: /^\d{6,12}$/.test(storeId) ? 'https://apps.apple.com/app/id' + storeId : null
  }
}