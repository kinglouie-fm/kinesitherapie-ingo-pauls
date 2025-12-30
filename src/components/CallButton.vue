<template>
    <a :href="`tel:${phone}`" class="call-btn" :aria-label="`Anrufen: ${label}`">
        <span class="call-btn-text">
            {{ label }}
        </span>

        <span class="call-btn-arrow" aria-hidden="true">
            →
        </span>
    </a>
</template>

<script setup>
defineProps({
    phone: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: "Termin buchen",
    },
});
</script>

<style scoped>
.call-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    background: #D42129;
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;

    padding: 10px 18px;
    border-radius: 10px;
    text-decoration: none;

    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    transition: background 150ms ease, transform 150ms ease;
}

.call-btn-arrow {
    display: inline-block;
    transition: transform 150ms ease;
}

.call-btn:hover,
.call-btn:focus-visible {
    background: #b71c22;
}

.call-btn:hover .call-btn-arrow,
.call-btn:focus-visible .call-btn-arrow {
    transform: translateX(2px);
}

.call-btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 3px;
}
</style>