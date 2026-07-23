const pages = Array.from(document.querySelectorAll("[data-page-panel]"));
const navLinks = Array.from(document.querySelectorAll("[data-page]"));
const chips = Array.from(document.querySelectorAll("[data-filter]"));
const cards = Array.from(document.querySelectorAll("[data-category]"));
const toolButtons = Array.from(document.querySelectorAll("[data-tool]"));
const modal = document.querySelector("#tool-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const modalCategory = document.querySelector("#modal-category");
const copySlugButton = document.querySelector("#copy-slug");

const toolDetails = {
  "Pixel Tag Builder": {
    category: "Visual",
    description:
      "Tạo rank tag, prefix chat và badge PNG theo kiểu tương lai, hợp với server branding hoặc cộng đồng creator.",
  },
  "Skin Resolver": {
    category: "Skin",
    description:
      "Tra cứu skin, UUID và dữ liệu liên quan để gắn profile, head, avatar hoặc luồng hiển thị người chơi.",
  },
  "YAML Sentinel": {
    category: "Config",
    description:
      "Kiểm tra thụt lề, ký tự tab và lỗi cấu trúc để giảm các sự cố khi xử lý file config Minecraft.",
  },
  "MOTD Reactor": {
    category: "Visual",
    description:
      "Dựng MOTD hai dòng, preview trực quan và tập trung vào độ tương phản để server list nhìn sắc nét hơn.",
  },
  "Item Lore Forge": {
    category: "Content",
    description:
      "Soạn lore, tên item, mô tả và chi tiết hiển thị cho shop, quest, RPG hoặc hệ thống nâng cấp.",
  },
  "MMO Drops Designer": {
    category: "Content",
    description:
      "Thiết kế loot table, rarity và phần thưởng theo kiểu MMO / RPG để nội dung game dễ đọc và dễ mở rộng.",
  },
  "Performance Tuner": {
    category: "Server",
    description:
      "Tập trung vào tối ưu cấu hình server, giảm tải CPU và hỗ trợ cân bằng trải nghiệm khi có nhiều người chơi.",
  },
  "Plugin Mapper": {
    category: "Server",
    description:
      "Nhóm plugin theo mục tiêu sử dụng, giúp staff nhìn nhanh plugin nào cần cài, plugin nào chỉ để tham khảo.",
  },
  "Command Pack": {
    category: "Config",
    description:
      "Bộ sưu tập câu lệnh hữu ích cho admin, builder và developer trong quá trình quản trị hoặc thử nghiệm.",
  },
};

function setActivePage(pageName) {
  pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.pagePanel === pageName);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.page === pageName);
  });
}

function scrollToPage(pageName) {
  const page = document.querySelector(`[data-page-panel="${pageName}"]`);
  if (page) {
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function filterCards(filter) {
  cards.forEach((card) => {
    const show = filter === "all" || card.dataset.category === filter;
    card.style.display = show ? "" : "none";
  });

  chips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.filter === filter);
  });
}

function openToolModal(toolName) {
  const details = toolDetails[toolName] || {
    category: "Tool",
    description: "Mô tả công cụ đang được thiết kế để phù hợp với hệ thống minetoolskai.",
  };

  modalCategory.textContent = details.category;
  modalTitle.textContent = toolName;
  modalBody.textContent = details.description;
  copySlugButton.dataset.slug = toolName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (typeof modal.showModal === "function") {
    modal.showModal();
  }
}

async function copySlug() {
  const slug = copySlugButton.dataset.slug || "";
  if (!slug) {
    return;
  }

  try {
    await navigator.clipboard.writeText(slug);
    copySlugButton.textContent = "Đã copy";
    setTimeout(() => {
      copySlugButton.textContent = "Copy slug";
    }, 1400);
  } catch {
    copySlugButton.textContent = "Không thể copy";
    setTimeout(() => {
      copySlugButton.textContent = "Copy slug";
    }, 1400);
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const pageName = link.dataset.page;
    setActivePage(pageName);
    scrollToPage(pageName);
  });
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterCards(chip.dataset.filter);
    setActivePage("home");
  });
});

toolButtons.forEach((button) => {
  button.addEventListener("click", () => openToolModal(button.dataset.tool));
});

cards.forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const toolName = card.querySelector("[data-tool]")?.dataset.tool;
      if (toolName) {
        openToolModal(toolName);
      }
    }
  });
});

copySlugButton?.addEventListener("click", copySlug);

filterCards("all");
setActivePage("home");
