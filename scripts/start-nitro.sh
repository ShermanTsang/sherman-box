#!/bin/sh
set -eu

map_runtime_env () {
  nuxt_name="$1"
  legacy_name="$2"
  case "$nuxt_name" in
    NUXT_PUBLIC_SITE_NAME) nuxt_value="${NUXT_PUBLIC_SITE_NAME:-}" ;;
    NUXT_PUBLIC_SITE_DESCRIPTION) nuxt_value="${NUXT_PUBLIC_SITE_DESCRIPTION:-}" ;;
    NUXT_PUBLIC_SITE_KEYWORDS) nuxt_value="${NUXT_PUBLIC_SITE_KEYWORDS:-}" ;;
    NUXT_PUBLIC_SITE_DOMAIN) nuxt_value="${NUXT_PUBLIC_SITE_DOMAIN:-}" ;;
    NUXT_PUBLIC_API_BASEURL) nuxt_value="${NUXT_PUBLIC_API_BASEURL:-}" ;;
    NUXT_PUBLIC_OSS_BASEURL) nuxt_value="${NUXT_PUBLIC_OSS_BASEURL:-}" ;;
  esac
  case "$legacy_name" in
    SITE_NAME) legacy_value="${SITE_NAME:-}" ;;
    SITE_DESCRIPTION) legacy_value="${SITE_DESCRIPTION:-}" ;;
    SITE_KEYWORDS) legacy_value="${SITE_KEYWORDS:-}" ;;
    SITE_DOMAIN) legacy_value="${SITE_DOMAIN:-}" ;;
    API_BASEURL) legacy_value="${API_BASEURL:-}" ;;
    OSS_BASEURL) legacy_value="${OSS_BASEURL:-}" ;;
  esac
  if [ -z "$nuxt_value" ] && [ -n "$legacy_value" ]; then
    export "$nuxt_name=$legacy_value"
  fi
}

map_runtime_env NUXT_PUBLIC_SITE_NAME SITE_NAME
map_runtime_env NUXT_PUBLIC_SITE_DESCRIPTION SITE_DESCRIPTION
map_runtime_env NUXT_PUBLIC_SITE_KEYWORDS SITE_KEYWORDS
map_runtime_env NUXT_PUBLIC_SITE_DOMAIN SITE_DOMAIN
map_runtime_env NUXT_PUBLIC_API_BASEURL API_BASEURL
map_runtime_env NUXT_PUBLIC_OSS_BASEURL OSS_BASEURL

exec node .output/server/index.mjs
