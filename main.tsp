import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;
using TypeSpec.Rest;

/**
 * This is a sample server Petstore server.
 */
@service({
  title: "Pet Store Service",
})
@server("https://example.com", "Single server endpoint")
namespace PetStore;

model Pet {
  @minLength(100)
  name: string;

  @minValue(0)
  @maxValue(100)
  age: int32;

  kind: "dog" | "cat" | "fish";
}

@route("/pets")
namespace Pets {
  op list(): Pet[];
}
