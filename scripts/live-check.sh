#!/usr/bin/env bash
# Diagnostic: where does recanedzamija.com point, and does each address answer?
for h in recanedzamija.com www.recanedzamija.com; do
  echo "===== $h"
  echo "--- A";     dig +short A $h
  echo "--- AAAA";  dig +short AAAA $h
  echo "--- CNAME"; dig +short CNAME $h
  echo "--- NS";    dig +short NS recanedzamija.com
  for ip in $(dig +short A $h | grep -E '^[0-9.]+$'); do
    printf "%s https: " "$ip"; curl -sS -o /dev/null -m 10 -w "%{http_code}\n" --resolve "$h:443:$ip" "https://$h/" 2>&1
    printf "%s http:  " "$ip"; curl -sS -o /dev/null -m 10 -w "%{http_code}\n" --resolve "$h:80:$ip" "http://$h/" 2>&1
  done
  for ip in $(dig +short AAAA $h | grep ':'); do
    printf "%s https: " "$ip"; curl -sS -6 -o /dev/null -m 10 -w "%{http_code}\n" --resolve "$h:443:[$ip]" "https://$h/" 2>&1
  done
done
echo "===== public resolvers"
for r in 8.8.8.8 1.1.1.1 9.9.9.9; do echo "$r: $(dig +short A recanedzamija.com @$r | tr '\n' ' ') | AAAA $(dig +short AAAA recanedzamija.com @$r | tr '\n' ' ')"; done
echo "===== whois"; whois recanedzamija.com 2>/dev/null | grep -iE "expir|status|name server|registrar:" | head -15
