<script>
export default {
  name: "EditProfile",
};
</script>

<template>
  <div class="col-lg-12 mx-auto mt-3">
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            class="rounded-circle shadow-4d-block mx-auto"
            alt="Avatar"
            width="200"
          />
          <label for="file-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-camera-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path
                d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
              />
            </svg>
          </label>
          <input id="file-input" type="file" />
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Nom</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="John Doe" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Email</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="john@example.com" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Téléphone</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="(239) 816-9029" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Mobile</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="(320) 380-4539" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Métier</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="Marketing" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-9 text-secondary">
            <input
              type="button"
              class="btn btn-primary px-4"
              value="Save Changes"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  justify-content: center;
}

body {
  background: #f7f7ff;
  margin-top: 20px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%),
    0 2px 6px 0 rgb(206 206 238 / 54%);
}

.card .card-body {
  display: flex;
  flex-direction: column;
}

.card .card-body > div:first-child {
  position: relative;
  align-self: center;
}

.me-2 {
  margin-right: 0.5rem !important;
}

svg {
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
</style>