if which linkerd &> /dev/null; then
  linkerd install | kubectl apply -f -
fi;
