cd $(dirname $0)
if which kustomize &> /dev/null; then
  kustomize build setup/ | kubectl apply -f -
  kustomize build . | kubectl apply -f -
fi;
