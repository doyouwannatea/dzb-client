<template>
  <div class="actions">
    <button class="ring-btn">
      <svg
        class="ring-icon"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.4764 11.0305C24.4764 8.86667 23.6168 6.79144 22.0867 5.26137C20.5567 3.73129 18.4814 2.8717 16.3176 2.8717C14.1537 2.8717 12.0785 3.73129 10.5484 5.26137C9.01834 6.79144 8.15876 8.86667 8.15876 11.0305C8.15876 20.5491 4.07935 23.2688 4.07935 23.2688H28.5558C28.5558 23.2688 24.4764 20.5491 24.4764 11.0305Z"
          stroke="#383838"
          stroke-width="2.71961"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.67 28.708C18.4309 29.1201 18.0878 29.4622 17.6749 29.7C17.2621 29.9378 16.794 30.063 16.3175 30.063C15.8411 30.063 15.373 29.9378 14.9602 29.7C14.5473 29.4622 14.2042 29.1201 13.9651 28.708"
          stroke="#383838"
          stroke-width="2.71961"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="user">
      <svg
        class="user-icon"
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.616 26.5094V23.9992C25.616 22.6677 25.087 21.3907 24.1455 20.4492C23.204 19.5077 21.927 18.9788 20.5955 18.9788H10.5546C9.22312 18.9788 7.94615 19.5077 7.00463 20.4492C6.06312 21.3907 5.53418 22.6677 5.53418 23.9992V26.5094"
          stroke="#3D68ED"
          stroke-width="2.51022"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5749 13.9584C18.3476 13.9584 20.5953 11.7106 20.5953 8.93793C20.5953 6.16521 18.3476 3.91748 15.5749 3.91748C12.8022 3.91748 10.5544 6.16521 10.5544 8.93793C10.5544 11.7106 12.8022 13.9584 15.5749 13.9584Z"
          stroke="#3D68ED"
          stroke-width="2.51022"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="username">Иванов Иван Иванович</span>
    </div>
  </div>
</template>

<style scoped>
  .actions {
    display: flex;
    align-items: center;
    gap: 1.875rem;
  }

  .ring-btn {
    border: 0;
    background: transparent;
    padding: 0.5rem;
    cursor: pointer;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 0.8125rem;
  }

  .username {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.4375em;
    color: var(--accent-color-1);
  }
</style>
